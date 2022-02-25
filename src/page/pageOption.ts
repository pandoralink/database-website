import { ElMessage } from "element-plus";
import { Ref, ref } from "vue";
import { HttpResponse, Result } from "@/@types/http";

export function useInsert<T>(
  list: Ref<T[]>,
  callback: (data: T) => Promise<HttpResponse>
) {
  // const insertOb = shallowRef<T>({} as T);
  const insertOb = ref({}) as Ref<T>;
  const isOpen = ref(false);
  const insert = () => (isOpen.value = true);
  const cancelInsert = () => (isOpen.value = false);

  async function confirmInsert(): Promise<void> {
    cancelInsert();
    const { data } = await callback(insertOb.value);
    const res = data as Result;
    if (res.code === 0) {
      list.value.unshift(insertOb.value);
      // 展示页面需为 10
      list.value.pop();
      ElMessage.success(res.msg);
    } else ElMessage.error("操作失败，请重试");
    insertOb.value = {} as T;
  }

  return {
    insertOb,
    isOpen,
    insert,
    cancelInsert,
    confirmInsert,
  };
}
