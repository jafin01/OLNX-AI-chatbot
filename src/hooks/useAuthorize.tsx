import { authorizeUser } from '@/services/auth';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AuthorizeResult, Credentials } from '../pages/login/login.types'

export function UseAuthorize(): UseMutationResult<AuthorizeResult, unknown, Credentials, null> {
  return useMutation(authorizeUser);
}
