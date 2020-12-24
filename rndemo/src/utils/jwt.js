import jwt from "react-native-pure-jwt";
export const jwtSignInAsync = async (name, password) => {
    const token = await jwt
        .sign(
            {
                name,
                password
            }, // body
            "black-world", // secret
            {
                alg: "HS256"
            }
        )

    return token

}


export const jwtVerifyAsync = async (token) => {

    const decoded = await jwt
        .decode(
            token, // the token
            "black-world" , // the secre
        )

    return decoded



}



