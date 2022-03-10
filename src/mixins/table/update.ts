import { Ref, ref } from "vue";
import { HttpResponse, Result } from "@/@types/http";
import { ElMessage } from "element-plus";

/**
 * 更新 hooks
 * @param list
 * @param callback
 */
export function useUpdateOnTable<T>(
  list: Ref<T[]>,
  callback: (data: T) => Promise<HttpResponse>
) {
  const isUpdate = ref(false);
  const index = ref(0);
  const updateOb = ref({}) as Ref<T>;
  const update = (updateIndex: number) => {
    isUpdate.value = true;
    index.value = updateIndex;
    updateOb.value = list.value[index.value];
  };

  async function confirmUpdate(updateOb: T) {
    cancelUpdate();
    const { data } = await callback(updateOb);
    const res = data as Result;
    if (res.code === 0) {
      list.value[index.value] = updateOb;
      ElMessage.success(res.msg);
    } else ElMessage.error("操作失败，请重试");
  }

  const cancelUpdate = () => {
    isUpdate.value = false;
  };
  return {
    updateOb,
    isUpdate,
    update,
    confirmUpdate,
    cancelUpdate,
  };
}
