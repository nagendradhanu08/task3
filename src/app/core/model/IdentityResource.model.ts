export class IdentityResource {
    Id: number
    Name: string
    Description: string
    Emphasize: boolean
    Required: boolean
    DisplayName: string
    // Enabled: boolean
    ShowInDiscoveryDocument: boolean
    IdentityClaims: IdentityClaims[]
}
export class IdentityClaims {
    Id: number
    Type: string
    IdentityResourceId: number
}