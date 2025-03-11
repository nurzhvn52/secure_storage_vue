<script setup>
import { useAppStore } from '@/stores/app';
import { computed, onMounted, reactive, ref } from 'vue';

const appStore = useAppStore();
const showOldPass = ref(false);
const showNewPass = ref(false);
const showConfirmPass = ref(false);
const canEdit = ref(false);
const userData = reactive({
    name: 'Regina',
    surname: 'R',
    patronymic: 'Rrre'
});
const passwordData = reactive({
    old_password: null,
    new_password: null,
    confirm_password: null
});
const initials = computed(() => {
    return (userData.name ? userData.name[0] : '') + (userData.surname ? userData.surname[0] : '');
});
const canSavePass = computed(() => {
    if (passwordData.old_password?.length 
        && passwordData.new_password?.length && passwordData.confirm_password?.length) {
            return true;
        }
    else return false;
});

const getUserInfo = async () => {
    const response = await appStore.getData('/' + appStore.user_id);
    userData.name = response.name;
    userData.surname = response.surname;
    userData.patronymic = response.patronymic;
};

const saveInfo = async () => {
    const response = await appStore.patchData('/');
    if (response) {
        canEdit.value = false;
        await getUserInfo();
    }
};

onMounted(async () => {
    // await getUserInfo();
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
                        v-model="userData.name"
                        :disabled="canEdit ? false : true"
                    />
                </div>
                <div>
                    <label>Surname</label>
                    <v-text-field 
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="userData.surname"
                        :disabled="canEdit ? false : true"
                    />
                </div>
                <div>
                    <label>Patronymic</label>
                    <v-text-field 
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="userData.patronymic"
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
                rounded-lg py-3 w-[72px] h-[72px] text-center"
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
        />
    </div>
</template>