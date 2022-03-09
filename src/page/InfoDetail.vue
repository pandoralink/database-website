<template>
  <content-header :show-filter="false">
    <template #right>
      <el-button type="primary" :icon="Edit" @click="update">更新</el-button>
      <el-button type="primary" :icon="Edit" @click="updateExperiences"
        >个人经历
      </el-button>
    </template>
  </content-header>
  <div class="base-content new">
    <!-- 左边距统一为 20px -->
    <base-list-item
      :show-index="false"
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :src="item.images"
    >
      <template #default>
        <span>姓名: {{ item.name }}</span
        ><br />
        <span>年龄: {{ item.age }}</span
        ><br />
        <span>国籍: {{ item.nationality }}</span
        ><br />
        <span>身份证号: {{ item.number }}</span
        ><br />
        <span>党派: {{ item.parties }}</span
        ><br />
        <span>学历: {{ item.education }}</span
        ><br />
      </template>
    </base-list-item>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <i-tag
        title="人物关系"
        v-if="
          relation.cPaternity?.length > 0 ||
          relation.fPaternity !== null ||
          relation.spouse?.length > 0
        "
      >
        <template #content>
          <tag-detail
            @click="toPeopleDetail(item)"
            v-for="(item, index) in relation.cPaternity"
            :key="index"
            :img="item.images"
            :content="'子女：' + item.name"
          ></tag-detail>
          <tag-detail
            @click="toPeopleDetail(item)"
            v-for="(item, index) in relation.spouse"
            :key="index"
            :img="item.images"
            :content="'配偶：' + item.name"
          ></tag-detail>
          <template v-if="relation.fPaternity">
            <tag-detail
              @click="toPeopleDetail(relation.fPaternity)"
              :img="relation.fPaternity.images"
              :content="'父母：' + relation.fPaternity.name"
            ></tag-detail>
          </template>
        </template>
      </i-tag>
      <i-tag
        title="上下级"
        v-if="relation.sub?.length > 0 || relation.sup?.length > 0"
      >
        <template #content>
          <tag-detail
            @click="toPeopleDetail(item)"
            v-for="(item, index) in relation.sub"
            :key="index"
            :img="item.images"
            :content="'上级：' + item.name"
          ></tag-detail>
          <tag-detail
            @click="toPeopleDetail(item)"
            v-for="(item, index) in relation.sup"
            :key="index"
            :img="item.images"
            :content="'下级：' + item.name"
          ></tag-detail>
        </template>
      </i-tag>
      <div>
        <el-tag effect="dark" size="large"> 所属部门</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation" @click="toDepartmentDetail">
          <div class="employ-relation-detail">
            <img
              :src="depart.image"
              style="width: 60px; height: 60px; border-radius: 30px"
            />
            <br />
            <span>{{ depart.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <i-tag
        title="测试新闻"
        :list="[
          {
            img: 'http://inews.gtimg.com/newsapp_ls/0/14576477631_640330/0',
            content: '测试新闻标题',
            round: true,
          },
        ]"
      />
    </div>
    <div
      class="detail-row"
      style="display: flex; flex-wrap: wrap; padding: 10px"
    >
      <div>
        <el-tag effect="dark" size="large"> 个人经历</el-tag>
        <br />
        <!-- 可以考虑使用 v-for 遍历人物关系 -->
        <div class="employ-relation">
          <div class="employ-relation-detail" style="align-items: flex-start">
            <span style="font-weight: bold">{{ peopleDetail.title }}</span>
            <p class="employ-detail">
              {{ peopleDetail.eventDetails }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <people-dialog
    v-model="isUpdate"
    :form="peopleDetail"
    @close="cancelUpdate"
    @confirm="confirmUpdate"
  />
  <experience-dialog
    v-model="isUpdateExperiences"
    :form="peopleDetail"
    @close="cancelUpdateExperiences"
    @confirm="confirmUpdateExperiences"
  />
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons";
import { ref } from "vue";
import { People, PeopleDetail, Department } from "../model/model";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { usePeopleStore } from "@/store/people";
import { getPeopleDetail } from "@/api/people";
import ContentHeader from "@/components/ContentHeader.vue";
import { useDepartmentStore } from "@/store/department";
import PeopleDialog from "@/components/dialog/PeopleDialog.vue";
import { useUpdate } from "@/mixins/update";
import ExperienceDialog from "@/components/dialog/ExperienceDialog.vue";
import TagDetail from "@/components/detail/TagDetail.vue";
import ITag from "@/components/detail/ITag.vue";

interface Relation {
  sup: People[];
  sub: People[];
  cPaternity: People[];
  fPaternity?: People;
  spouse: People[];
}

const list: People[] = [];

const peopleStore = usePeopleStore();
const people = peopleStore.people;
list.push(people);
let peopleDetail = ref<PeopleDetail>(Object.assign({}, people));

const depart = ref<Department>({} as Department);
const paternity = ref<People[]>([]);
const relation = ref<Relation>({} as Relation);

const init = async () => {
  const {
    detail,
    department,
    relation: relationship,
  } = await getPeopleDetail(people);
  depart.value = department;
  peopleDetail.value = Object.assign({}, peopleDetail, detail);
  relation.value = relationship;
};
init();

const router = useRouter();
const toDepartmentDetail = () => {
  const departmentStore = useDepartmentStore();
  departmentStore.updateDepartment(depart.value);
  router.push("/departDetail");
};
const toPeopleDetail = (people: People) => {
  const peopleStore = usePeopleStore();
  peopleStore.updatePeople(people);
  router.push(`/infoDetail/${people.name}`);
};

const { isUpdate, update, confirmUpdate, cancelUpdate } = useUpdate();
const {
  isUpdate: isUpdateExperiences,
  update: updateExperiences,
  confirmUpdate: confirmUpdateExperiences,
  cancelUpdate: cancelUpdateExperiences,
} = useUpdate();
</script>
