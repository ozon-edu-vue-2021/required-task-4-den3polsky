<template>
  <div class="form">
    <form @submit="sendRequest">
      <section>
        <h2>Личные данные</h2>

        <div class="form-row">
          <Field
            v-bind="form_data.last_name"
            v-model="form_data.last_name.value"
            :error.sync="form_data.last_name.error"
          />
          <Field
            v-bind="form_data.first_name"
            v-model="form_data.first_name.value"
            :error.sync="form_data.first_name.error"
          />
          <Field
            v-bind="form_data.patronymic"
            v-model="form_data.patronymic.value"
            :error.sync="form_data.patronymic.error"
          />
        </div>

        <div class="form-row date_birthday-wrapper">
          <Field
            v-bind="form_data.date_birthday"
            v-model="form_data.date_birthday.value"
            :error.sync="form_data.date_birthday.error"
            placeholder="дд.мм.гггг"
            name="date_birthday"
          />
        </div>

        <div class="form-row email-wrapper">
          <Field
            v-bind="form_data.email"
            v-model="form_data.email.value"
            :error.sync="form_data.email.error"
            name="email"
          />
        </div>

        <div class="form-row">
          <Field
            type="radio"
            name="sex"
            v-bind="form_data.sex"
            v-model="form_data.sex.value"
            :error.sync="form_data.sex.error"
            :options="[
              { label: 'Мужской', id: 'male' },
              { label: 'Женский', id: 'female' },
            ]"
          />
        </div>
      </section>

      <section>
        <h2>Паспортные данные</h2>
        <div class="form-row dropdown-wrapper">
          <DropDown
            title="Гражданство"
            key_field="uid"
            label_field="nationality"
            :items="citizenships"
            @select="selectCitizenshipHandler"
          />
        </div>

        <template v-if="isRussain">
          <div class="form-row">
            <Field
              v-bind="form_data.passport_series"
              v-model="form_data.passport_series.value"
              :error.sync="form_data.passport_series.error"
              name="passport_series"
            />
            <Field
              v-bind="form_data.passport_number"
              v-model="form_data.passport_number.value"
              :error.sync="form_data.passport_number.error"
              name="passport_number"
            />
            <Field
              v-bind="form_data.date_issue"
              v-model="form_data.date_issue.value"
              :error.sync="form_data.date_issue.error"
              name="date_issue"
              placeholder="дд.мм.гггг"
            />
          </div>

          <div class="form-row">
            <Field
              v-bind="form_data.isChangeName"
              type="radio"
              v-model="form_data.isChangeName.value"
              name="isChangeName"
              :options="[
                { label: 'Да', id: true },
                { label: 'Нет', id: false },
              ]"
            />
          </div>

          <template v-if="form_data.isChangeName.value">
            <div class="form-row">
              <Field
                v-bind="form_data.last_name_old"
                v-model="form_data.last_name_old.value"
                :error.sync="form_data.last_name_old.error"
              />
              <Field
                v-bind="form_data.first_name_old"
                v-model="form_data.first_name_old.value"
                :error.sync="form_data.first_name_old.error"
              />
            </div>
          </template>
        </template>

        <template v-else-if="form_data.selectedCitizenship">
          <div class="form-row">
            <Field
              v-bind="form_data.last_name_latin"
              v-model="form_data.last_name_latin.value"
              :error.sync="form_data.last_name_latin.error"
            />
            <Field
              v-bind="form_data.first_name_latin"
              v-model="form_data.first_name_latin.value"
              :error.sync="form_data.first_name_latin.error"
            />
          </div>

          <div class="form-row">
            <Field
              v-bind="form_data.passport_number"
              :test="null"
              v-model="form_data.passport_number.value"
              :error.sync="form_data.passport_number.error"
            />

            <DropDown
              title="Страна выдачи"
              key_field="code"
              label_field="name"
              :items="countries"
              @select="selectCountryHandler"
            />

            <Field
              v-bind="form_data.passportType"
              v-model="form_data.passportType.value"
              :options="passportTypes"
              type="select"
            />
          </div>
        </template>
      </section>

      <div class="buttons-wrapper">
        <button type="submit" class="submit">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import countries from "@/assets/data/countries.json";

import passportTypes from "@/assets/data/passport-types.json";

import {
  onlyCyrillic,
  onlyLatin,
  isEmail,
  isDate,
  passportSeries,
  passportNumber,
} from "@/utils/validators.js";
import { eventBus } from "@/main";

import DropDown from "./DropDown.vue";
import Field from "./Field.vue";

export default {
  components: {
    DropDown,
    Field,
  },

  data() {
    return {
      form_data: {
        last_name: {
          value: "",
          title: "Фамилия",
          test: onlyCyrillic,
        },

        last_name_latin: {
          value: "",
          title: "Фамилия на латинице",
          test: onlyLatin,
        },

        first_name: {
          value: "",
          title: "Имя",
          test: onlyCyrillic,
        },

        first_name_latin: {
          value: "",
          title: "Имя на латинице",
          test: onlyLatin,
        },

        patronymic: {
          value: "",
          title: "Отчество",
          test: onlyCyrillic,
        },

        date_birthday: {
          value: "",
          title: "Дата рождения",
          test: isDate,
        },

        email: {
          value: "",
          title: "E-mail",
          test: isEmail,
        },

        sex: {
          value: null,
          title: "Пол",
        },

        passport_number: {
          value: "",
          title: "Номер паспорта",
          test: passportNumber,
        },

        passport_series: {
          value: "",
          title: "Серия паспорта",
          test: passportSeries,
        },

        date_issue: {
          value: "",
          title: "Дата выдачи",
          test: isDate,
        },

        isChangeName: {
          value: false,
          title: "Меняли ли фамилию или имя?",
        },

        last_name_old: {
          value: "",
          title: "Предыдущая фамилия",
          test: onlyCyrillic,
        },

        first_name_old: {
          value: "",
          title: "Предыдущее имя",
          test: onlyCyrillic,
        },

        passportType: {
          value: null,
          title: "Тип паспорта",
        },

        selectedCitizenship: null,
        selectedCountry: null,
      },

      citizenships: [],
      passportTypes: [],
    };
  },

  computed: {
    isRussain() {
      return this.form_data.selectedCitizenship?.nationality === "Russia";
    },
  },

  created() {
    this.citizenships = citizenships;
    this.countries = countries;
    this.passportTypes = passportTypes.map((item) => ({
      label: item.type,
      id: item.id,
    }));
  },

  methods: {
    selectCitizenshipHandler(value) {
      this.form_data.selectedCitizenship = value;
    },

    selectCountryHandler(value) {
      this.form_data.selectedCountry = value;
    },

    sendRequest(event) {
      event.preventDefault();

      //Запустим валидацию в дочерних компонентах
      eventBus.$emit("validate");

      if (this.validate()) {
        const sendData = {};
        Object.keys(this.form_data).forEach(
          (key) => (sendData[key] = this.form_data[key]?.value)
        );

        console.log(JSON.stringify(sendData));
      }
    },

    validate() {
      let isValid = true;

      Object.values(this.form_data).forEach((field) => {
        if (field?.error?.length > 0) {
          isValid = false;
        }
      });

      return isValid;
    },
  },
};
</script>

<style scoped>
.form {
  --myBlue: #2d5aff;
  --myGrey: #74747440;
}

.form {
  max-width: 800px;
  border: 2px solid #dddddd;
  padding: 15px;
}

.form h2 {
  font-size: 16px;
}

.form-row {
  display: flex;
  margin: 0px 0px 25px 0px;
  column-gap: 30px;
}

@media only screen and (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
  .form-row div {
    margin-bottom: 10px;
  }
}

.form-row div {
  width: 100%;
}

.date_birthday-wrapper {
  max-width: 200px;
}

.email-wrapper {
  max-width: 400px;
}

.dropdown-wrapper {
  max-width: 300px;
}

.form .submit {
  background: var(--myBlue);
  color: white;
  border: none;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.buttons-wrapper {
  display: flex;
  justify-content: flex-end;
}

.form-row::v-deep .inline-item {
  display: inline-block;
  margin-right: 10px;
}

.form::v-deep input[type="text"],
.form::v-deep select {
  width: 100%;
  height: 40px;
  border: 2px var(--myGrey) solid;
  border-radius: 5px;
  padding: 0px 8px;
}

.form::v-deep input[type="text"]:focus {
  outline: none;
  border: 2px var(--myBlue) solid;
}

.form-row::v-deep label,
.form-row::v-deep .label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #959595;
}
</style>
