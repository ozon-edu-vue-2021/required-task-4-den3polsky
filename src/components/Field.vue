<template>
  <div v-if="type === 'radio'" class="field-wrapper">
    <div class="label">{{ title }}</div>
    <div
      class="inline-item"
      v-for="option in options"
      :key="option.id"
    >
      <input
        :type="type"
        :name="name"
        :id="name + '_' + option.id"
        :value="option.id"
        @change="input($event.target._value)"
      />
      <label class="label-radio" :for="name + '_' + option.id">{{
        option.label
      }}</label>
    </div>
  </div>

  <div v-else-if="type === 'select'" class="field-wrapper">
    <div class="label">{{ title }}</div>
    <select @change="input($event.target.value)">
      <option />
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="option.id === value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>

  <div v-else class="field-wrapper">
    <label :for="name">{{ title }}</label>
    <input
      :type="type"
      :value="value"
      @input="input($event.target.value)"
      @blur="validateHandler($event.target.value)"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :class="{ invalid: error.length > 0 }"
    />
    <div class="error" v-if="error.length > 0">{{ error }}</div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import {validate} from "@/utils/validation";

export default {
  props: {

    rule: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Boolean],
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: "",
    },

  },

  data() {
    return {
      hasError: false,
      selected: null,
    };
  },

  created() {
    eventBus.$on("validate", () => {
      this.validate(this.value);
    });
  },

  destroyed() {
    
    this.$emit("onError", {text: '', field: this.name});
    this.$emit("input", "");
  },

  methods: {
    input(value) {
      if (this.hasError) {
        this.validate(value);
      }
      this.$emit("input", value);
    },

    validateHandler(value) {

      this.validate(value);
    },

    validate(value) {
      
      if (this.rule.length > 0) {

        const result =  validate(value, this.rule);
        this.$emit("onError", {text: result.error, field: this.name});
        this.hasError = !result.isValid;
      }
    },
  },
};
</script>

<style scoped>
.form-row .label-radio {
  color: initial;
  cursor: pointer;
}

.form-row label {
  display: inline-block;
}

.error {
  color: red;
  font-size: 11px;
}

.form input[type="text"].invalid {
  border-bottom: 2px solid red;
}
</style>
