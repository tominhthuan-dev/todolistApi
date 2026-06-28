import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
// Đánh dấu đây là một Entity của TypeORM
// Entity sẽ ánh xạ với một bảng trong database
// 'users' là tên bảng trong MySQL
@Entity('users')
export class User {
    // Khóa chính (PRIMARY KEY)
    // Tự động tăng giá trị (AUTO_INCREMENT)
    @PrimaryGeneratedColumn()
    id: number;
    
    // Cột username trong database
    // unique: true nghĩa là không được trùng lặp
    // Ví dụ:
    // admin  ✓
    // user1  ✓
    // admin  ✗ (báo lỗi)
    @Column({unique: true})username: string;

    // Lưu mật khẩu đã hash bằng bcrypt
    @Column()password: string;

    // Cột role dùng để phân quyền
    // Sau này RolesGuard sẽ kiểm tra:
    // user.role === "admin" ?
    @Column()role: string;
}