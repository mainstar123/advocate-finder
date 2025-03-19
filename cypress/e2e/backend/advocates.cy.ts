describe("Advocates API", () => {
  it("should fetch advocates data", () => {
    cy.request("/api/advocates").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("total");
    });
  });

  it("should add a new advocate", () => {
    const newAdvocate = {
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      degree: "MD",
      specialties: ["Cardiology"],
      yearsOfExperience: 10,
      phoneNumber: "1234567890",
    };

    cy.request("POST", "/api/advocates", newAdvocate).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Advocate added and cache invalidated",
      );
    });
  });

  it("should update an advocate", () => {
    const updatedAdvocate = {
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      city: "Los Angeles",
      degree: "PhD",
      specialties: ["Neurology"],
      yearsOfExperience: 15,
      phoneNumber: "0987654321",
    };

    cy.request("PUT", "/api/advocates", updatedAdvocate).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Advocate updated and cache invalidated",
      );
    });
  });

  it("should delete an advocate", () => {
    const advocateId = { id: 1 };

    cy.request("DELETE", "/api/advocates", advocateId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Advocate deleted and cache invalidated",
      );
    });
  });
});
