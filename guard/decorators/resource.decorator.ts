import { SetMetadata } from '@nestjs/common';

export const META_RESOURCE = 'resource';

/**
 * Keycloak Resource.
 * @param id - name of resource
 */
export const Resource = (id: string) =>
  SetMetadata(META_RESOURCE, id);
