import Prisma from "../src/db";
import { server } from "../src/server";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
  await Prisma.$disconnect();
});

beforeEach(async () => {
  await Prisma.entry.deleteMany({});
});

describe("API Routes", () => {
  describe("GET /get/", () => {
    it("should return empty array when no entries exist", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
      expect(JSON.parse(response.payload)).toEqual([]);
    });

    it("should return all entries", async () => {
      await Prisma.entry.create({
        data: {
          title: "test1",
          description: "Description 1",
          created_at: new Date(),
          scheduled_date: new Date("2024-12-30"),
        },
      });
      await Prisma.entry.create({
        data: {
          title: "test2",
          description: "Description 2",
          created_at: new Date(),
          scheduled_date: new Date("2024-12-31"),
        },
      });

      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      console.log(payload);
      expect(payload.length).toBe(2);
      expect(payload[0]).toHaveProperty("title", "test1");
      expect(payload[1]).toHaveProperty("title", "test2");
    });
  });

  describe("GET /get/:id", () => {
    it("should return the specified entry", async () => {
      const entry = await Prisma.entry.create({
        data: {
          title: "Test Entry",
          description: "Test Description",
          created_at: new Date(),
          scheduled_date: new Date(),
        },
      });

      const response = await server.inject({
        method: "GET",
        url: `/get/${entry.id}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("id", entry.id);
      expect(payload).toHaveProperty("title", "Test Entry");
    });

    it("should return 500 if entry not found", async () => {
      const nonExistentId = "non-existant-id";
      const response = await server.inject({
        method: "GET",
        url: `/get/${nonExistentId}`,
      });

      expect(response.statusCode).toBe(500);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", `Error finding entry with id ${nonExistentId}`);
    });
  });

  describe("POST /create/", () => {
    it("should create a new entry", async () => {
      const newEntry = {
        title: "New Entry",
        description: "New Description",
        scheduled_date: new Date(),
      };

      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: newEntry,
      });

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("id");
      expect(payload).toHaveProperty("title", "New Entry");
      expect(payload).toHaveProperty("description", "New Description");
    });

    it("should return 500 if creation fails", async () => {
      const invalidEntry = {
        description: "Missing title",
      };

      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: invalidEntry,
      });

      expect(response.statusCode).toBe(500);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", "Error creating entry");
    });
  });

  describe("PUT /update/:id", () => {
    it("should update an existing entry", async () => {
      const entry = await Prisma.entry.create({
        data: {
          title: "Old Title",
          description: "Old Description",
          created_at: new Date(),
          scheduled_date: new Date(),
        },
      });

      const updatedData = {
        title: "Updated Title",
        description: "Updated Description",
        scheduled_date: new Date(),
      };

      const response = await server.inject({
        method: "PUT",
        url: `/update/${entry.id}`,
        payload: updatedData,
      });

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", "Updated successfully");

      const updatedEntry = await Prisma.entry.findUnique({
        where: { id: entry.id },
      });

      expect(updatedEntry).toHaveProperty("title", "Updated Title");
      expect(updatedEntry).toHaveProperty("description", "Updated Description");
    });

    it("should return 500 if update fails", async () => {
      const updatedData = {
        title: "Updated Title",
        description: "Updated Description",
      };

      const response = await server.inject({
        method: "PUT",
        url: "/update/non-existent-id",
        payload: updatedData,
      });

      expect(response.statusCode).toBe(500);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", "Error updating");
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should delete an existing entry", async () => {
      const entry = await Prisma.entry.create({
        data: {
          title: "Entry to Delete",
          description: "Description",
          created_at: new Date(),
          scheduled_date: new Date(),
        },
      });

      const response = await server.inject({
        method: "DELETE",
        url: `/delete/${entry.id}`,
      });

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", "Deleted successfully");

      const deletedEntry = await Prisma.entry.findUnique({
        where: { id: entry.id },
      });
      expect(deletedEntry).toBeNull();
    });

    it("should return 500 if deletion fails", async () => {
      const nonExistentId = "non-existent-id";

      const response = await server.inject({
        method: "DELETE",
        url: `/delete/${nonExistentId}`,
      });

      expect(response.statusCode).toBe(500);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("msg", "Error deleting entry");
    });
  });
});
