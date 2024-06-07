import { getMembers } from '../services/api/memberService/MemberService';

export function MembersLoader(id: number) {
    return getMembers(id);
}
