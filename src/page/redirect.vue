<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const { params, query } = useRoute();
const { path } = params;
router.replace({ path: "/" + path, query });
</script>
