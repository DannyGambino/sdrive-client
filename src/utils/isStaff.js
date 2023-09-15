export const isStaff = () => {
    const auth = localStorage.getItem("sdrive")
    const userType = JSON.parse(auth)
    return userType?.staff
}