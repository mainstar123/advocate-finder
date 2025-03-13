describe("Advocates Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/advocates?page=1&pageSize=10&search=john", {
      fixture: "getAdvocatesSearchJohn.json",
    }).as("getAdvocatesSearchJohn");

    cy.intercept("GET", "/api/advocates?page=1&pageSize=10&search=", {
      fixture: "getAdvocates.json",
    }).as("getAdvocates");

    cy.intercept("GET", "/api/advocates?page=2&pageSize=10&search=", {
      fixture: "getAdvocates.json",
    }).as("getAdvocates");

    cy.visit("/");
  });

  it("should display the title", () => {
    cy.get("h2").contains("Solace Advocates");
  });

  it("should fetch and display advocates data", () => {
    cy.wait("@getAdvocates");
    cy.get("table").should("exist");
    cy.get("table tbody tr:visible").should("have.length.greaterThan", 0);
  });

  it("should search for advocates", () => {
    cy.get('input[aria-label="Search advocates"]').should("be.visible");
    cy.get('input[aria-label="Search advocates"]').clear();
    cy.get('input[aria-label="Search advocates"]').type("John", { delay: 100 });

    cy.wait("@getAdvocatesSearchJohn").wait(500);

    cy.get("table tbody tr:visible").each(($row) => {
      cy.wrap($row).contains("John");
    });

    cy.get("table tbody tr:visible").should("contain.text", "John");
  });

  it("should reset the search input", () => {
    cy.get('input[aria-label="Search advocates"]').type("John", { delay: 100 });
    cy.get("button").contains("Reset").click();
    cy.get('input[aria-label="Search advocates"]').should("have.value", "");
  });

  it("should paginate through advocates", () => {
    cy.get(".ant-pagination-item").contains("2").click();
    cy.get(".ant-pagination-item-active").contains("2");
  });
});
