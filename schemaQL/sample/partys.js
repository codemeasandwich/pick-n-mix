
module.exports = {
  description:`The Party API implementation is responsible for listing partys.

Party rules

* Dont steal our Koozies!
* Dont drink and drive
* Say No to Drame

Have fun.`,

  model:`{
    id : String,
    attendees:[accounts_user_item],
    time: String // ISO timestamp
  }`
}
