import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: "http://localhost:8080/",
    realm: "reactjs",
    clientId: "react-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
