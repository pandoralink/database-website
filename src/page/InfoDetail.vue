<template>
  <content-header :show-filter="false">
    <template #right>
      <el-button type="primary" :icon="Edit" @click="update"
        >个人信息
      </el-button>
      <el-button type="primary" :icon="Edit" @click="updateExperience"
        >个人经历
      </el-button>
      <el-button type="primary" :icon="Edit" @click="updateParent"
        >父母
      </el-button>
      <el-button type="primary" :icon="Edit" @click="updateDepartment"
        >部门
      </el-button>
      <el-button type="primary" :icon="Edit" @click="toSpouse">配偶</el-button>
      <el-button type="primary" :icon="Edit" @click="toChildrenPaternity"
        >子女
      </el-button>
      <el-button type="primary" :icon="Edit" @click="toSupHierarchy"
        >上级
      </el-button>
      <el-button type="primary" :icon="Edit" @click="toSubHierarchy"
        >下级
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
          relation.fPaternity ||
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
      <i-tag title="所属部门" v-if="depart">
        <template #content>
          <tag-detail
            @click="toDepartmentDetail"
            :img="depart.image"
            :content="depart.name"
            round
          ></tag-detail>
        </template>
      </i-tag>
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
    @confirm="confirmPeopleUpdate"
  />
  <experience-dialog
    v-model="isUpdateExperiences"
    :form="peopleDetail"
    @close="cancelUpdateExperiences"
    @confirm="confirmUpdateExperiences"
  />
  <parent-dialog
    v-model="isUpdateParent"
    :form="relation.fPaternity ? relation.fPaternity : {}"
    @close="cancelUpdateParent"
    @confirm="confirmUpdateParent"
  />
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons";
import { ref } from "vue";
import {
  People,
  PeopleDetail,
  Department,
  Paternity,
  Experiences,
} from "../model/model";
import BaseListItem from "../components/BaseListItem.vue";
import { useRouter } from "vue-router";
import { usePeopleStore } from "@/store/people";
import { getPeopleDetail, updatePeople } from "@/api/people";
import ContentHeader from "@/components/ContentHeader.vue";
import { useDepartmentStore } from "@/store/department";
import PeopleDialog from "@/components/dialog/PeopleDialog.vue";
import { useUpdate } from "@/mixins/update";
import ExperienceDialog from "@/components/dialog/ExperienceDialog.vue";
import TagDetail from "@/components/detail/TagDetail.vue";
import ITag from "@/components/detail/ITag.vue";
import { Relation, Relationship } from "@/@types/model";
import ParentDialog from "@/components/dialog/ParentDialog.vue";
import { ElMessage } from "element-plus";
import { useSpouseStore } from "@/store/spouse";
import { usePeopleDetailStore } from "@/store/peopledetail";
import { usePaternityStore } from "@/store/paternity";
import { Result } from "@/@types/http";
import { updateExperiences } from "@/api/experiences";

const list = ref<People[]>([]);

const peopleStore = usePeopleStore();
const people = peopleStore.people;
list.value.push(people);
let peopleDetail = ref<PeopleDetail>(Object.assign({}, people));

const depart = ref<Department | undefined>();
const paternity = ref<People[]>([]);
const relation = ref<Relation>({} as Relation);
const relationship = ref<Relationship>({} as Relationship);

const init = async () => {
  const {
    detail,
    department,
    relation: relationOnPeople,
    relationship: originRelation,
  } = await getPeopleDetail(people);
  depart.value = department;
  peopleDetail.value = Object.assign({}, peopleDetail, detail);
  relation.value = relationOnPeople;
  relationship.value = originRelation;
};
init();

const router = useRouter();
const toDepartmentDetail = () => {
  const departmentStore = useDepartmentStore();
  if (depart.value) {
    departmentStore.updateDepartment(depart.value);
  }
  router.push("/departDetail");
};
const toPeopleDetail = (people: People) => {
  const peopleStore = usePeopleStore();
  peopleStore.updatePeople(people);
  router.push({
    path: "/infoDetail",
    query: {
      t: +new Date(),
    },
  });
};

const { isUpdate, update, cancelUpdate } = useUpdate();
const confirmPeopleUpdate = async (updateOb: People) => {
  cancelUpdate();
  const { data } = await updatePeople(updateOb);
  const res = data as Result;
  if (res.code === 0) {
    list.value[0] = updateOb;
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
const {
  isUpdate: isUpdateExperiences,
  update: updateExperience,
  cancelUpdate: cancelUpdateExperiences,
} = useUpdate();
const confirmUpdateExperiences = async (updateOb: Experiences) => {
  cancelUpdateExperiences();
  const { data } = await updateExperiences(updateOb);
  const res = data as Result;
  if (res.code === 0) {
    peopleDetail.value = { ...peopleDetail.value, ...updateOb };
    // Object.assign() peopleDetail.value
    ElMessage.success(res.msg);
  } else ElMessage.error("操作失败，请重试");
};
const {
  isUpdate: isUpdateParent,
  confirmUpdate: confirmUpdateParent,
  cancelUpdate: cancelUpdateParent,
} = useUpdate();
const updateParent = () => {
  ElMessage.info("接口暂存争议");
};
const updateDepartment = () => {
  ElMessage.info("暂未开发");
};
const toSpouse = () => {
  const spouseStore = useSpouseStore();
  spouseStore.updateSpouseName(people.name);
  if (relationship.value.Spouse) {
    spouseStore.updateSpouse(relationship.value.Spouse);
  }
  router.push("/spouse");
};
const toSupHierarchy = () => {
  const peopleDetailStore = usePeopleDetailStore();
  peopleDetailStore.updateHierarchy(relationship.value.SupHierarchy);
  peopleDetailStore.updatePeople(people);
  peopleDetailStore.updateType("sub");
  router.push("/supHierarchy");
};
const toSubHierarchy = () => {
  const peopleDetailStore = usePeopleDetailStore();
  peopleDetailStore.updateHierarchy(relationship.value.SubHierarchy);
  peopleDetailStore.updatePeople(people);
  peopleDetailStore.updateType("sup");
  router.push("/supHierarchy");
};
const toChildrenPaternity = () => {
  const peopleDetailStore = usePaternityStore();
  peopleDetailStore.updatePaternity(relationship.value.CPaternity);
  peopleDetailStore.updatePeople(people);
  router.push("/paternity");
};
</script>
