<template>
  <div class="dropdown" v-click-outside="closeDropdown">
    <div class="label">{{ title }}</div>

    <div class="dropdown-inner">
      <input
        class="dropdown-input"
        type="text"
        ref="dropdownInput"
        v-model="value"
        @input="inputHandler"
        @click="inputHandler"
        @keydown.down="dropdownInputKeyDownHandler"
        @keydown.enter="dropdownInputEnterDownHandler"
        @focus="isOpenDropDown = true"
      />

      <span class="dropdown-icon" @click="isOpenDropDown = true">▼</span>

      <span v-if="selected" class="dropdown-close" @click="clearValueHandler"
        >✕</span
      >

      <ul
        class="dropdown-list"
        v-if="isOpenDropDown && filtredValues.length"
        ref="ul"
      >
        <li
          v-for="(item, index) in filtredValues"
          :key="item[key_field]"
          ref="dropdownItems"
          tabindex="1"
          @click="selectValueHandler(item)"
          @keydown.enter="selectValueHandler(item)"
          @keydown="dropDownNavigationBoundaryCasesHandler($event, index)"
          v-html="
            item[label_field].replace(
              new RegExp(value, 'i'),
              '<mark>' + '$&' + '</mark>'
            )
          "
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import throttle from "lodash.throttle";
import vClickOutside from "v-click-outside";

Vue.use(vClickOutside);

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    key_field: {
      type: String,
      default: "id",
    },
    label_field: {
      type: String,
      default: "label",
    },
  },

  data() {
    return {
      value: "",
      selected: null,
      isOpenDropDown: false,
      filtredValues: [],
    };
  },

  created() {
    this.getfiltredValuesList();
  },

  methods: {
    getfiltredValuesList: throttle(function () {
      const finded = this.value.toLowerCase();

      this.filtredValues = this.items.filter((item) => {
        return item[this.label_field].toLowerCase().includes(finded);
      });
    }, 1100),

    inputHandler() {
      this.isOpenDropDown = true;
      this.getfiltredValuesList();
    },

    dropdownInputKeyDownHandler(event) {
      if (this.filtredValues.length > 0) {
        event.preventDefault();
        this.$refs.dropdownItems[0].focus();
      }
    },

    selectValueHandler(value) {
      this.selected = value;
      this.value = value[this.label_field];
      this.isOpenDropDown = false;

      this.$emit("select", value);
    },

    clearValueHandler() {
      this.selected = null;
      this.value = "";

      this.$emit("select", null);
    },

    // обработка крайних случаев при навигации по списку
    dropDownNavigationBoundaryCasesHandler(event, index) {
      // Переходими в поле ввода, если фокус на первом элементе и нажата клавиша ArrowUp
      if (event.code === "ArrowUp" && index === 0) {
        event.preventDefault();
        this.$refs.dropdownInput.focus();
      }

      // переходим в начало списка, если фокус на последнем элементе и нажата клавиша ArrowDown
      if (
        event.code === "ArrowDown" &&
        index + 1 === this.filtredValues.length &&
        this.filtredValues.length > 0
      ) {
        event.preventDefault();
        this.$refs.dropdownItems[0].focus();
      }
    },

    dropdownInputEnterDownHandler() {
      //Если в списке остался один элемент, то его можно выбрать при нажатии Enter в поле ввода
      if (this.filtredValues.length == 1) {
        this.selectValueHandler(this.filtredValues[0]);
      }
    },

    closeDropdown() {
      this.isOpenDropDown = false;
    },
  },
};
</script>

<style scoped>
.dropdown-inner {
  position: relative;
}

.dropdown-list {
  z-index: 1;
  position: absolute;
  list-style: none;
  max-height: 500px;
  min-height: 200px;
  overflow-y: scroll;
  width: 100%;
  background-color: white;
  margin: 0px 0px 0px 0px;
  padding: 0px 5px 0px 5px;
  border: 1px #7474747a solid;
}

.dropdown-list li {
  cursor: pointer;
  padding: 6px 8px;
  margin: 4px 0px;
}

.dropdown-list li:hover,
.dropdown-list li:focus {
  box-shadow: 0 0 0px 1px #1f8dff;
  border-radius: 2px;
  outline: none;
}

.dropdown-close {
  position: absolute;
  right: 10px;
  top: 13px;
  cursor: pointer;
  font-size: 12px;
}

.dropdown-icon {
  position: absolute;
  right: 20px;
  top: 13px;
  cursor: pointer;
  font-size: 12px;
}
</style>

<style>
mark {
  background-color: initial;
  color: #2d5aff;
}
</style>
