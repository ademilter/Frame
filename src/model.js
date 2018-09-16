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

export class CalendarItem {
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
