/* eslint-disable @typescript-eslint/no-explicit-any */
// helper/apolloClient.ts

'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  FetchResult,
  NormalizedCacheObject,
  ApolloError,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { Observable } from '@apollo/client/utilities';
import { GlobalVariables } from '@/lib/constant';
import { useAuthStore } from '@/store/auth.store';
import { AlertService } from '@/services/alertService';
import { onLogoutService } from '@/services/onLogoutService';
// import { AlertService } from '@/service/alertService';

let globalAbortController: AbortController | null = new AbortController();

export const createGlobalAbortController = () => {
  if (globalAbortController) {
    globalAbortController.abort();
  }
  globalAbortController = new AbortController();
};

const customFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  if (!navigator.onLine) {
    // handleNetworkOffline();
  }

  const uri = input.toString();
  const options = init || {};
  // const options = { ...init, signal: globalAbortController?.signal };
  return fetch(uri, options);
};

const errorAlert = (error: ApolloError) => {
  AlertService.error(error?.message, [], { autoClose: true });
};
const httpLink = new HttpLink({
  uri: GlobalVariables.baseUrl.V,
  credentials: 'same-origin',
  fetch: customFetch,
});

const uploadLink = createUploadLink({
  uri: GlobalVariables.baseUrl.V1,
}) as unknown as ApolloLink;

const dynamicLink = new ApolloLink((operation, forward) => {
  const useUploadLink = operation.getContext().useUploadLink;

  const selectedLink = useUploadLink ? uploadLink : httpLink;

  return selectedLink.request(operation, forward);
});

const authRestLink = new ApolloLink((operation, forward) => {
  const user = useAuthStore.getState()?.user;
  operation.setContext(({ headers = {} }: { headers: HeadersInit }) => ({
    headers: {
      ...headers,
      Accept: 'application/json',
      Authorization: user?.token ? `Bearer ${user?.token}` : '',
    },
  }));

  return new Observable<FetchResult<Record<string, any>>>((observer) => {
    const signal = globalAbortController ? globalAbortController.signal : null;
    const handle = forward(operation).subscribe({
      next: (result) => {
        const { errors, ...resp } = result;
        if (errors?.length) {
          AlertService.error(errors[0]?.message, [], {
            autoClose: true,
          });
        }
        if (result?.data?.logout) {
          createGlobalAbortController();
          onLogoutService.logout(true);
        }
        observer.next(resp);
      },
      error: (error) => {
        errorAlert(error);
        observer.next(error);
        // handleApolloError();
      },
      complete: () => {
        observer.complete();
      },
    });

    operation.setContext({ fetchOptions: { signal } });

    return () => {
      handle.unsubscribe();
      if (globalAbortController) {
        globalAbortController.abort();
        globalAbortController = null;
      }
    };
  });
});

function makeClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([authRestLink, dynamicLink]),
    cache: new InMemoryCache(),
  });
}

const buildFormData = (
  formData: FormData,
  data: unknown,
  parentKey?: string,
): void => {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        (data as Record<string, unknown>)[key],
        parentKey ? `${parentKey}[${key}]` : key,
      );
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey!, value as string | Blob);
  }
};

const jsonToFormData = (data: unknown): FormData => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

function getClient(): ApolloClient<NormalizedCacheObject> {
  if (!clientInstance) {
    clientInstance = makeClient();
  }
  return clientInstance;
}

export { makeClient, getClient, jsonToFormData, globalAbortController };
