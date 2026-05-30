import { Injectable} from "@nestjs/common";

@Injectable()
export class AuthRepository {
    // fake database
    private users = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        role: "admin",
    },
    {
        id: 2,
        username: "user1",
        password: "user1",
        role: "user",
    },
    {
        id: 3,
        username: "user2",
        password: "user2",
        role: "user",
    },
  ];


    // tìm user theo username
    findByUsername(username: string) {
        return this.users.find(
            (user) => user.username === username,
        );
    }
}