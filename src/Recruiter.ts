import { recruiters } from "./config/recruiters";

export class Recruiter {
  id: number;
  name: string;
  rule: number[];
  /**
   * Create a Recruiter
   */
  constructor(id: number, name: string, rule: number[]) {
    this.id = id;
    this.name = name;
    this.rule = rule;
  }

  /**
   * Load a recruiter record from state/storage
   *
   * @param name
   */
  static load(name: string) {
    const data = recruiters.find((customer) => customer.recruiterName === name);
    if (!data) {
      throw new Error("Recruiter not found");
    }
    return new this(data.recruiterId, data.recruiterName, data.ruleId);
  }
}
