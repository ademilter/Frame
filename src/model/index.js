export class Note {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.content = data.content || ''
  }
}

export class Task {
  constructor (data = {}) {
    this.id = data.id || new Date().getTime()
    this.status = data.text || false
    this.text = data.text || ''
  }

  get isEmpty () {
    return this.text.trim().length === 0
  }
}

export class CalendarListItem {
  constructor (data) {
    this.isShow = true
    this.accessRole = data.accessRole // 'owner'
    this.backgroundColor = data.backgroundColor // '#9fc6e7'
    this.defaultReminders = data.defaultReminders // []
    this.etag = data.etag // '1431014289956000'
    this.foregroundColor = data.foregroundColor // '#000000'
    this.id = data.id // 'hgfdfgmmgffghjk@group.calendar.google.com'
    this.kind = data.kind // 'calendar#calendarListEntry'
    this.location = data.location // 'ISTANBUL'
    this.selected = data.selected // true
    this.summary = data.summary // 'Genel'
    this.timeZone = data.timeZone // 'Europe/Istanbul'
  }
}

export class CalendarItem {
  constructor (data) {
    this.attendees = data.attendees // [{email: "ademilter@gmail.com", displayName: "Adem Ilter", self: true, responseStatus: "accepted"},…]
    this.created = data.created // "2018-09-03T20:52:25.000Z"
    this.creator = data.creator // {email: "ilyas.teker@gmail.com", displayName: "ilyas teker"}
    this.description = data.description // "Saati 17:00 yapsak uyar mi abi?"
    this.end = data.end // {dateTime: "2018-09-20T18:00:00+03:00"}
    this.etag = data.etag // ""3074216283874000""
    this.htmlLink = data.htmlLink // "https://www.google.com/calendar/event?eid=ZzAwNHV2MzNzbTk4Ymc3NHNlM2NscTRoNGcgYWRlbWlsdGVyQG0"
    this.iCalUID = data.iCalUID // "g004uv33sm98bg74se3clq4h4g@google.com"
    this.id = data.id // "g004uv33sm98bg74se3clq4h4g"
    this.kind = data.kind // "calendar#event"
    this.location = data.location // "Capitol Starbucks"
    this.organizer = data.organizer // {email: "ilyas.teker@gmail.com", displayName: "ilyas teker"}
    this.reminders = data.reminders // {useDefault: true}
    this.sequence = data.sequence // 0
    this.start = data.start // {dateTime: "2018-09-20T17:00:00+03:00"}
    this.status = data.status // "confirmed"
    this.summary = data.summary // "Adem - İlyas Bulusma"
    this.updated = data.updated // "2018-09-16T14:29:01.937Z"
  }
}
