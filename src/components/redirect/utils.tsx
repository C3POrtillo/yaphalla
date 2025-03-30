import { redirects } from '@/utils/pathsRedirect';

export const getTarget = (redirectLink: string) => redirects[`/${redirectLink}` as keyof typeof redirects];
