export type AuthStorage = {
    token: string,
    roleId: string, 
    userId: string
}  
export const authStorage: AuthStorage= {
    token:  localStorage.getItem("token")??"",
    roleId: localStorage.getItem("roleId")??"", 
    userId: localStorage.getItem("userId")??""
} 

export const signIn = (authData: AuthStorage) => {
    authStorage.token = authData.token
    authStorage.roleId = authData.roleId
    authStorage.userId = authData.userId
    localStorage.setItem("token", authData.token)
    localStorage.setItem("roleId", authData.roleId)
    localStorage.setItem("userId", authData.userId)
}

export const signOut = () => {
    authStorage.token = ""
    authStorage.roleId = ""
    authStorage.userId = ""
    localStorage.removeItem("token")
    localStorage.removeItem("roleId")
    localStorage.removeItem("userId")
}

