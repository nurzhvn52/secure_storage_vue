import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Main',
		meta: { public: true },
		component: () => import('@/pages/Index.vue')
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('@/pages/Profile.vue')
	},
	{
		path: '/login',
		name: 'Login',
		meta: { public: true },
		component: () => import('@/pages/Login.vue')
	},
	{
		path: '/registration',
		name: 'Registration',
		meta: { public: true },
		component: () => import('@/pages/Registration.vue')
	},
	{
		path: '/api/secure-storage/user/confirm/:uidb64/:token',
		name: 'Confirm Register User',
		component: () => import('@/pages/ConfirmRegister.vue')
	},
	{
		path: '/storage',
		name: 'Storage',
		component: () => import('@/pages/ItemList.vue')
	},
	{
		path: '/storage/create',
		name: 'Create Storage Item',
		component: () => import('@/pages/ItemList.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!sessionStorage.getItem('token');

	if (to.meta.public) {
		next();
	} 
	else if (isAuthenticated) {
		next();
	} 
	else {
		next({ path: '/login', query: { redirect: to.fullPath } });
	}
});

export default router
