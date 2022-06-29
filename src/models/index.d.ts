import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class FreudianSlip {
  readonly id: string;
  readonly ego?: string | null;
  readonly superego?: string | null;
  constructor(init: ModelInit<FreudianSlip>);
  static copyOf(source: FreudianSlip, mutator: (draft: MutableModel<FreudianSlip>) => MutableModel<FreudianSlip> | void): FreudianSlip;
}