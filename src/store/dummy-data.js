export const dummyCalendarList = () => {
  return [
    {
      'accessRole': 'owner',
      'backgroundColor': '#9fc6e7',
      'defaultReminders': [],
      'etag': '"435465ygfdfgdf"',
      'foregroundColor': '#000000',
      'id': 'gdfdssfdgd544@group.calendar.google.com',
      'kind': 'calendar#calendarListEntry',
      'location': 'ISTANBUL',
      'summary': 'Genel',
      'timeZone': 'Europe/Istanbul'
    },
    {
      'accessRole': 'owner',
      'backgroundColor': '#b3dc6c',
      'defaultReminders': [{ 'method': 'popup', 'minutes': 30 }],
      'etag': '"sdgfhggdf45"',
      'foregroundColor': '#000000',
      'id': '35efagsa@gmail.com',
      'kind': 'calendar#calendarListEntry',
      'location': 'ISTANBUL',
      'selected': true,
      'summary': 'Özel',
      'timeZone': 'Europe/Istanbul'
    },
    {
      'accessRole': 'reader',
      'backgroundColor': '#16a765',
      'defaultReminders': [],
      'etag': '"1537106192955000"',
      'foregroundColor': '#000000',
      'id': 'tr.turkish#holiday@group.v.calendar.google.com',
      'kind': 'calendar#calendarListEntry',
      'summary': 'Türkiye\'deki Tatiller',
      'timeZone': 'Europe/Istanbul'
    },
    {
      'accessRole': 'reader',
      'backgroundColor': '#fbe983',
      'defaultReminders': [],
      'etag': '"1537106200237000"',
      'foregroundColor': '#000000',
      'id': 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com',
      'kind': 'calendar#calendarListEntry',
      'summary': 'Phases of the Moon',
      'timeZone': 'Europe/Istanbul'
    }
  ]
}
export const dummyCalendarItems = () => {
  return [
    {
      'attendees': [
        {
          'email': 'ademilter@gmail.com',
          'displayName': 'Adem Ilter',
          'self': true,
          'responseStatus': 'accepted'
        }, {
          'email': 'ilyas.teker@gmail.com',
          'displayName': 'ilyas teker',
          'organizer': true,
          'responseStatus': 'accepted'
        }
      ],
      'created': '2018-09-03T20:52:25.000Z',
      'creator': {
        'email': 'ilyas.teker@gmail.com',
        'displayName': 'ilyas teker'
      },
      'description': 'Saati 17:00 yapsak uyar mi abi?',
      'end': { 'dateTime': '2018-09-20T18:00:00+03:00' },
      'etag': '"3074216283874000"',
      'htmlLink': 'https://www.google.com/calendar/event?eid=ZzAwNHV2MzNzbTk4Ymc3NHNlM2NscTRoNGcgYWRlbWlsdGVyQG0',
      'iCalUID': 'g004uv33sm98bg74se3clq4h4g@google.com',
      'id': 'g004uv33sm98bg74se3clq4h4g',
      'kind': 'calendar#event',
      'location': 'Capitol Starbucks',
      'organizer': {
        'email': 'ilyas.teker@gmail.com',
        'displayName': 'ilyas teker'
      },
      'reminders': { 'useDefault': true },
      'sequence': 0,
      'start': { 'dateTime': '2018-09-20T17:00:00+03:00' },
      'status': 'confirmed',
      'summary': 'Adem - İlyas Bulusma',
      'updated': '2018-09-16T14:29:01.937Z'
    },
    {
      'attendees': [
        {
          'email': 'ademilter@gmail.com',
          'displayName': 'Adem Ilter',
          'self': true,
          'responseStatus': 'accepted'
        }
      ],
      'created': '2018-08-21T08:40:53.000Z',
      'creator': {
        'email': 'ademilter@gmail.com',
        'displayName': 'Adem Ilter',
        'self': true
      },
      'description': 'Bunun gibi otomatik oluşturulmuş etkinlikler hakkında ayrıntılı bilgi görmek üzere, resmî Google Takvim uygulamasını kullanın. https://g.co/calendar\n\nBu etkinlik, Gmail\'e aldığınız bir e-postan oluşturuldu. https://mail.google.com/mail?extsrc=cal&plid=ACUX6DPFcYfLJYrZOEh7QWpkJORwc7Vr-Jfxirc\n',
      'end': { 'dateTime': '2018-09-23T07:00:00+03:00' },
      'etag': '"3069681706778000"',
      'htmlLink': 'https://www.google.com/calendar/event?eid=XzZ0bG5hcXJsZTVwNmNwYjRkaG1qNHBocGVocW40ZDlwNmRrbjhyOWpjNHBqMnFiOWUxbDM0c3BsY29vM2dxajRkdHI2b29yNjY5cDMwbzlwZWRvbWdvajljcGs3MGNqNGN0aTNhZGoyY2hrbWUgYWRlbWlsdGVyQG0',
      'iCalUID': '7kukuqrfedlm2f9tur593itm3a31iipj2s5f08jdovlcf2r0a9sqhbifhp2dgd56bdig',
      'id': '_6tlnaqrle5p6cpb4dhmj4phpehqn4d9p6dkn8r9jc4pj2qb9e1l34splcoo3gqj4dtr6oor669p30o9pedomgoj9cpk70cj4cti3adj2chkme',
      'kind': 'calendar#event',
      'location': 'İstanbul IST',
      'organizer': { 'email': 'unknownorganizer@calendar.google.com' },
      'reminders': { 'useDefault': false },
      'sequence': 0,
      'start': { 'dateTime': '2018-09-23T05:15:00+03:00' },
      'status': 'confirmed',
      'summary': 'Uçuş hedefi: Elazığ (TK 2642)',
      'updated': '2018-08-21T08:40:53.484Z'
    },
    {
      'created': '2008-11-18T00:00:00.000Z',
      'creator': {
        'email': 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com',
        'displayName': 'Phases of the Moon',
        'self': true
      },
      'end': { 'date': '2018-09-18' },
      'etag': '"2453932800000000"',
      'htmlLink': 'https://www.google.com/calendar/event?eid=bW9vbnBoYXNlKzE1MzcxMzk3MDAwMDAgaHQzamxmYWFjNWxmZDYyNjN1bGZoNHRxbDhAZw',
      'iCalUID': 'moonphase+1537139700000@google.com',
      'id': 'moonphase+1537139700000',
      'kind': 'calendar#event',
      'organizer': {
        'email': 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com',
        'displayName': 'Phases of the Moon',
        'self': true
      },
      'sequence': 0,
      'start': { 'date': '2018-09-17' },
      'status': 'confirmed',
      'summary': 'İlk dördün 02:15',
      'updated': '2008-11-18T00:00:00.000Z'
    },
    {
      'created': '2008-11-18T00:00:00.000Z',
      'creator': {
        'email': 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com',
        'displayName': 'Phases of the Moon',
        'self': true
      },
      'end': { 'date': '2018-09-26' },
      'etag': '"2453932800000000"',
      'htmlLink': 'https://www.google.com/calendar/event?eid=bW9vbnBoYXNlKzE1Mzc4NDM5ODAwMDAgaHQzamxmYWFjNWxmZDYyNjN1bGZoNHRxbDhAZw',
      'iCalUID': 'moonphase+1537843980000@google.com',
      'id': 'moonphase+1537843980000',
      'kind': 'calendar#event',
      'organizer': {
        'email': 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com',
        'displayName': 'Phases of the Moon',
        'self': true
      },
      'sequence': 0,
      'start': { 'date': '2018-09-25' },
      'status': 'confirmed',
      'summary': 'Dolunay 05:53',
      'updated': '2008-11-18T00:00:00.000Z'
    }
  ]
}
