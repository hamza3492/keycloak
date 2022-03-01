// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import Keycloak from '../keycloak/keycloak.entity'
// import CreateResourceDto from './dto/createResource.dto';

// @Injectable()
// export class KeycloakService {
//     constructor(
//         @InjectRepository(Keycloak)
//         private keycloakRepository: Repository<Keycloak>
//     ) { }

//     async setCurrentRefreshToken(keycloakData: CreateResourceDto) {
//         // const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
//         const newResource = this.keycloakRepository.create(keycloakData);
//         await this.keycloakRepository.save(newResource);
//         return newResource
//     }
// }    

// export default KeycloakService;