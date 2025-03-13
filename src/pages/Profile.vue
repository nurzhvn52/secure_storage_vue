<script setup>
import { useAppStore } from '@/stores/app';
import { computed, onMounted, reactive, ref } from 'vue';

const appStore = useAppStore();
const showOldPass = ref(false);
const showNewPass = ref(false);
const showConfirmPass = ref(false);
const canEdit = ref(false);
const userData = reactive({
    first_name: null,
    last_name: null,
    username: null
});
const passwordData = reactive({
    old_password: null,
    new_password: null,
    confirm_password: null
});
const initials = computed(() => {
    return (userData.first_name ? userData.first_name[0] : '') + (userData.last_name ? userData.last_name[0] : '');
});
const canSavePass = computed(() => {
    if (passwordData.old_password?.length 
        && passwordData.new_password?.length && passwordData.confirm_password?.length) {
            return true;
        }
    else return false;
});

const getUserInfo = async () => {
    const response = await appStore.getData('/api/secure-storage/user/' + appStore.user_id);
    if (response.data) {
        userData.first_name = response.data.user?.first_name;
        userData.last_name = response.data.user?.last_name;
        userData.username = response.data.user?.username;
    }
};

const saveInfo = async () => {
    const response = await appStore.patchData('/api/secure-storage/user/' + appStore.user_id + '/', userData);
    if (response) {
        canEdit.value = false;
        await getUserInfo();
    }
};

const changePassword = async () => {
    await appStore.patchData('/api/change-password/', passwordData);
};

onMounted(async () => {
    await getUserInfo();
});
</script>

<template>
    <div class="flex justify-between">
        <div class="flex flex-col w-1/2">
            <h3 class="text-[28px] font-bold">Personal data</h3>
            <div class="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
                <div>
                    <label>Name</label>
                    <v-text-field 
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="userData.first_name"
                        :disabled="canEdit ? false : true"
                    />
                </div>
                <div>
                    <label>Surname</label>
                    <v-text-field 
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="userData.last_name"
                        :disabled="canEdit ? false : true"
                    />
                </div>
                <div>
                    <label>Username</label>
                    <v-text-field 
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="userData.username"
                        :disabled="canEdit ? false : true"
                    />
                </div>
            </div>
            <v-btn 
                v-if="canEdit"
                text="Save" 
                class="text-none mt-5"
                flat
                color="#070ACA"
                rounded="lg"
                width="112"
                @click="saveInfo()"
            />
        </div>
        <div class="flex flex-col items-end">
            <div class="text-[32px] font-medium text-white bg-[#C37B17] 
                rounded-lg py-3 w-[72px] h-[72px] text-center uppercase"
            >
                {{ initials }}
            </div>
            <v-btn 
                :text="canEdit ? 'Cancel' : 'Edit'" 
                class="text-none mt-5"
                :prepend-icon="canEdit ? '' : 'mdi-pencil'"
                flat
                color="#070ACA"
                rounded="lg"
                width="112"
                @click="canEdit = !canEdit"
            />
        </div>
    </div>
    <div class="flex flex-col w-1/2 mt-10">
        <h3 class="text-[28px] font-bold">Change password</h3>
        <div class="grid grid-cols-2 gap-x-10 gap-y-5 mt-5">
            <div>
                <label>Old Password</label>
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    hide-details
                    v-model="passwordData.old_password"
                    :append-inner-icon="showOldPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :type="showOldPass ? 'text' : 'password'"
                    @click:append-inner="showOldPass = !showOldPass"
                />
            </div>
            <div></div>
            <div>
                <label>New Password</label>
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    hide-details
                    v-model="passwordData.new_password"
                    :append-inner-icon="showNewPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :type="showNewPass ? 'text' : 'password'"
                    @click:append-inner="showNewPass = !showNewPass"
                />
            </div>
            <div>
                <label>Confirm New Password</label>
                <v-text-field 
                    variant="outlined"
                    density="compact"
                    hide-details
                    v-model="passwordData.confirm_password"
                    :append-inner-icon="showConfirmPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :type="showConfirmPass ? 'text' : 'password'"
                    @click:append-inner="showConfirmPass = !showConfirmPass"
                />
            </div>
        </div>
        <v-btn 
            text="Save" 
            class="text-none mt-5"
            flat
            color="#070ACA"
            rounded="lg"
            width="112"
            :disabled="!canSavePass"
            @click="changePassword"
        />
    </div>
</template>