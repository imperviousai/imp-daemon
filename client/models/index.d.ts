import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type DIDMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class DID {
  readonly id: string;
  readonly twitterUsername: string;
  readonly longFormDid: string;
  readonly shortFormDid?: string | null;
  readonly avatarUrl?: string | null;
  readonly lastUpdated?: number | null;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<DID, DIDMetaData>);
  static copyOf(source: DID, mutator: (draft: MutableModel<DID, DIDMetaData>) => MutableModel<DID, DIDMetaData> | void): DID;
}