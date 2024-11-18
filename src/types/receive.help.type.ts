export interface Stage {
  stage: number;
  associatedConsumers: number;
  helpedConsumers: number;
  partiallyPaidConsumers: number;
  notInvitedMembers: number;
  totalConumers: number;
  amount: number;
}

export interface ReceiveHelpList {
  associatesConsumers: number;
  helpedConsumers: number;
  partiallyPaidConsumers: number;
  notInvitedCount: number;
  stages: Stage[];
}

export interface ReceiveHelpListResponse {
  data: {
    receiveHelpListCount: ReceiveHelpList;
  };
}
