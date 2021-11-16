<template>
  <div class="form">
    <form @submit="sendRequest">
      <section>
        
        <h2>Личные данные</h2>

        <div class="form-row">
          <Field
            v-bind="form_fields.last_name"
            v-model="form_data.last_name"
            @onError="getErrorHandler"
          />
          <Field
            v-bind="form_fields.first_name"
            v-model="form_data.first_name"
            @onError="getErrorHandler"  
          />
          <Field
            v-bind="form_fields.patronymic"
            v-model="form_data.patronymic"
            @onError="getErrorHandler"  
          />
        </div>

        <div class="form-row date_birthday-wrapper">
          <Field
            v-bind="form_fields.date_birthday"
            v-model="form_data.date_birthday"
            @onError="getErrorHandler"  
          />
        </div>

        <div class="form-row email-wrapper">
          <Field
            v-bind="form_fields.email"
            v-model="form_data.email"
            @onError="getErrorHandler"  
          />
        </div>

        <div class="form-row">
          <Field
            type="radio"
            v-bind="form_fields.sex"
            v-model="form_data.sex"
            @onError="getErrorHandler"            
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
              v-bind="form_fields.passport_series"
              v-model="form_data.passport_series"
              @onError="getErrorHandler"  
            />
            <Field
              v-bind="form_fields.passport_number"
              v-model="form_data.passport_number"
              @onError="getErrorHandler"  
            />
            <Field
              v-bind="form_fields.date_issue"
              v-model="form_data.date_issue"
              @onError="getErrorHandler"  
            />
          </div>

          <div class="form-row">
            <Field
              type="radio"
              v-bind="form_fields.isChangeName"              
              v-model="form_data.isChangeName"        
            />
          </div>

          <template v-if="form_data.isChangeName">
            <div class="form-row">
              <Field
                v-bind="form_fields.last_name_old"
                v-model="form_data.last_name_old"
                @onError="getErrorHandler"  
              />
              <Field
                v-bind="form_fields.first_name_old"
                v-model="form_data.first_name_old"
                @onError="getErrorHandler"  
              />
            </div>
          </template>
        </template>

        <template v-else-if="form_data.selectedCitizenship">
          <div class="form-row">
            <Field
              v-bind="form_fields.last_name_latin"
              v-model="form_data.last_name_latin"
              @onError="getErrorHandler" 
            />
            <Field
              v-bind="form_fields.first_name_latin"
              v-model="form_data.first_name_latin"
              @onError="getErrorHandler" 
            />
          </div>

          <div class="form-row">
            <Field
              v-bind="form_fields.passport_number"
              rule=""
              v-model="form_data.passport_number"
              @onError="getErrorHandler" 
            />

            <DropDown
              title="Страна выдачи"
              key_field="code"
              label_field="name"
              :items="countries"
              @select="selectCountryHandler"
            />

            <Field
              v-bind="form_fields.passportType"
              v-model="form_data.passportType"
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
import {eventBus} from "@/main";
import {form_fields}  from '@/form_fields'

import DropDown from "./DropDown";
import Field from "./Field";
import Vue from 'vue';

export default {
  components: {
    DropDown,
    Field,
  },

  data() {
    return {

      form_data: {

        ...this.mapFormData(form_fields),
        selectedCitizenship: null,
        selectedCountry: null,
      },

      form_fields: this.mapFormFields(form_fields),

      citizenships: [],
      passportTypes: [],
      errors: []
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

    mapFormData(obj) {            
        return Object.assign({}, ...Object.keys(obj).map(key => ({
          [key]: 'default' in obj[key] ?  obj[key].default : ''
        })));
    },


    mapFormFields(obj) {            
        return Object.assign({}, ...Object.keys(obj).map(key => ({
            [key]: {...obj[key], name: key}
        })));
    },

    selectCitizenshipHandler(value) {
      this.form_data.selectedCitizenship = value;
    },

    selectCountryHandler(value) {
      this.form_data.selectedCountry = value;
    },

    getErrorHandler(error) {
      
        Vue.set(this.form_fields[error.field], 'error', error.text )  
    },

    sendRequest(event) {
      event.preventDefault();

      //Запустим валидацию в дочерних компонентах
      eventBus.$emit("validate");

      if (this.validate()) {

        console.log(JSON.stringify(this.form_data))
        
      }
    },

    validate() {
      let isValid = true;

      Object.values(this.form_fields).forEach((field) => {
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
