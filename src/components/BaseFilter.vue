<template>
  <el-popover
    title="筛选"
    v-model:visible="visible"
    :width="400"
    :show-arrow="false"
    placement="bottom-start"
  >
    <template #reference>
      <div>
        <div class="base-filter">
          <div>
            <el-input
              style="border-radius: 10px; background-color: #f5f5f5"
              v-model="searchContent"
              placeholder="罗通竟然.."
            >
              <template #prefix>
                <el-icon class="el-input__icon" :color="black">
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </div>
          <div class="base-filter-button" ref="filter" @click="visible = !visible">
            <el-icon :size="24" :color="black">
              <Filter />
            </el-icon>
            <p style="margin: 0; user-select: none;">筛选</p>
          </div>
        </div>
        <div class="filter-text">
          <template v-for="(value, name) in showTextList" :key="name">
            <el-tag
              v-if="value"
              type="success"
              closable
              style="margin-right: 10px"
              @close="deleteFilterOption(name)"
            >
              {{ value }}
            </el-tag>
          </template>
        </div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { Filter, Search } from "@element-plus/icons";
import { ref } from "vue";

const props = defineProps<{
  showTextList?: Record<string, unknown>;
}>();

const emits = defineEmits<{
  (e: "delete", key: string): void;
}>();

const black = "black";
const searchContent = ref("");
const visible = ref(false);

function deleteFilterOption(name: string) {
  emits("delete", name);
}
</script>
