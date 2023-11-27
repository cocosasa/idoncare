export type KidDemandedData = {
    pocketMoneyRequestId: number;
    parent: {
      id: number;
      name: string;
    };
    child: {
      id: number;
      name: string;
    };
    amount: number;
    content: string;
    createdAt: string;
    cancelDate: string;
  };
  