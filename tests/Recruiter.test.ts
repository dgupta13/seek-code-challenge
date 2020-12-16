import { Recruiter } from "../src/Recruiter";

describe("Recruiter Tests",  () => {
  it("Load Recruiter",  () => {
    const recruiter = Recruiter.load("MYER");
    expect([recruiter.id, recruiter.name, recruiter.rule]).toEqual([
      3,
      "MYER",
      [3, 4],
    ]);
  });

  it("Missing Recruiter Data",  () => {
    expect(() => Recruiter.load('Test')).toThrow();
  });
});
