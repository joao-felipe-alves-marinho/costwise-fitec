import { getMe } from '../services/api/userService/UserService';

export function UserLoader() {
    return getMe();
}
