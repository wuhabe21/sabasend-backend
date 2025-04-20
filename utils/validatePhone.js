export default function validatePhone(phone) {
  return /^(\+2519\d{8}|09\d{8})$/.test(phone)
}
