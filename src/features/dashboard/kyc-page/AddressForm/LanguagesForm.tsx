/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combobox } from '@/components/Combobox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import { GlobalVariables } from '@/lib/constant';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { useQuery } from '@apollo/client';
import { GET_LANGUAGE } from '@/graphql/query/common.query';
import Typography from '@/components/Typography';
import { addressVerificationSchema } from '@/schema/kyc.schema';

interface LanguagesFormType {
  formInfo: UseFormReturn<z.infer<typeof addressVerificationSchema>>;
}

const LanguagesForm: React.FC<LanguagesFormType> = ({ formInfo }) => {
  const { data: LanguageList, loading: LanguageLoading } =
    useQuery(GET_LANGUAGE);
  return (
    <>
      <div>
        <Typography
          as="span"
          className="font-roboto text-2xl !font-bold leading-[18.75px]"
        >
          Languages
        </Typography>
        <div className="h-3"></div>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <FormField
            control={formInfo.control}
            name="motherTongue"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel htmlFor="" className="text-base font-normal">
                  Choose your mother tongue
                </FormLabel>
                <FormControl>
                  <Combobox
                    Options={LanguageList?.languages || []}
                    SelectedOption={
                      LanguageList?.languages?.find(
                        (item: any) => item.id === value,
                      ) || null
                    }
                    isLoading={LanguageLoading}
                    onChange={(value) => onChange(value?.id)}
                    placeholder="Mother Tongue"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={formInfo.control}
            name="communicationId"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel htmlFor="" className="text-base font-normal">
                  Choose your Communication Language
                </FormLabel>
                <FormControl>
                  <Combobox
                    Options={GlobalVariables.CommunicationLanguage || []}
                    SelectedOption={
                      GlobalVariables.CommunicationLanguage?.find(
                        (item: any) => item?.id === value,
                      ) || null
                    }
                    onChange={(value) => {
                      onChange(value?.id);
                      formInfo.setValue('communicationLanguage', value?.lid);
                    }}
                    placeholder="Communication Language"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default LanguagesForm;
