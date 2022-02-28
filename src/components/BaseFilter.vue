<template>
  <div>
    <div class="base-filter">
      <el-tooltip effect="light" placement="bottom" content="按下回车搜索">
        <div>
          <template v-for="(value, name) in filterOption" :key="name">
            <el-input
              v-if="name === currentKey"
              style="border-radius: 10px; background-color: #f5f5f5"
              v-model="filterOption[name].value"
              :placeholder="value.alias"
              @change="search"
            >
              <template #prefix>
                <el-icon
                  style="cursor: pointer"
                  @click="search"
                  class="el-input__icon"
                  :color="black"
                >
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </template>
        </div>
      </el-tooltip>
      <el-dropdown @command="changeFilterOption">
        <div
          class="base-filter-button"
          ref="filter"
          @click="visible = !visible"
        >
          <el-icon :size="24" :color="black">
            <Filter />
          </el-icon>
          <p style="margin: 0; user-select: none">筛选</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(value, name) in filterOption"
              :key="name"
              :command="name"
              >{{ value.alias }}
            </el-dropdown-item>
          </el-dropdown-menu>
          <slot name="dropdown"></slot>
        </template>
      </el-dropdown>
    </div>
    <div class="filter-text">
      <template v-for="(value, name) in filterOption" :key="name">
        <el-tag
          v-if="value.value"
          type="success"
          closable
          style="margin-right: 10px"
          @close="deleteFilterOption(name)"
        >
          {{ value.value }}
        </el-tag>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Filter, Search } from "@element-plus/icons";
import { onMounted, ref } from "vue";
import { ValueAlias } from "@/model/filter";

/**
 * showTextList: 展示已经输入筛选部分标签
 * searchMenu: 筛选菜单 - 中文名称
 * defaultFilterOption: 默认筛选选项
 */
const props = defineProps<{
  showTextList: Record<string, ValueAlias>;
  defaultFilterOption: string;
}>();

const emits = defineEmits<{
  (e: "change", filterOption: Record<string, ValueAlias>): void;
}>();

const black = "black";
const filterOption = ref<Record<string, ValueAlias>>({});
const currentKey = ref("");
const visible = ref(false);
const placeholder = ref("");

onMounted(() => {
  currentKey.value = props.defaultFilterOption;
  filterOption.value = Object.assign({}, props.showTextList);
});

function deleteFilterOption(name: string) {
  filterOption.value[name].value = "";
  search();
}

const search = () => {
  emits("change", filterOption.value);
};

// 选中筛选菜单，改变筛选条件
const changeFilterOption = (key: string) => {
  currentKey.value = key;
};
</script>
