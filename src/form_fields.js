export  const form_fields = {

        last_name: {
            title: "Фамилия",
            rule: 'onlyCyrillic',
        },

        last_name_latin: {
            title: "Фамилия на латинице",
            rule: 'onlyLatin',
        },

        first_name: {
            title: "Имя",
            rule: 'onlyCyrillic',
        },

        first_name_latin: {
            title: "Имя на латинице",
            rule: 'onlyLatin',
        },

        patronymic: {
            title: "Отчество",
            rule: 'onlyCyrillic',
        },

        date_birthday: {
            title: "Дата рождения",
            rule: 'isDate',
            placeholder: "дд.мм.гггг"
        },

        email: {

            title: "E-mail",
            rule: 'isEmail',
        },

        sex: {          
            title: "Пол",
            default: null,
            options: [ { label: 'Мужской', id: 'male' }, { label: 'Женский', id: 'female' }, ]
        },

        passport_number: {

            title: "Номер паспорта",
            rule: 'passportNumber',
        },

        passport_series: {

            title: "Серия паспорта",
            rule: 'passportSeries',
        },

        date_issue: {

            title: "Дата выдачи",
            rule: 'isDate',
            placeholder: "дд.мм.гггг"
        },

        isChangeName: {
            title: "Меняли ли фамилию или имя?",
            default: false,
            options: [ { label: 'Да', id: true },{ label: 'Нет', id: false }]
        },

        last_name_old: {

            title: "Предыдущая фамилия",
            rule: 'onlyCyrillic',
        },

        first_name_old: {
            title: "Предыдущее имя",
            rule: 'onlyCyrillic',
        },

        passportType: {
            title: "Тип паспорта",
            default: null
        }
}
