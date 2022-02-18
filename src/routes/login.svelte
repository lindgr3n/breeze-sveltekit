<script context="module">
    export async function load({session}) {
        const {authenticated} = session;

        if(authenticated) {
            return {
                status: 302,
                redirect: '/dashboard'
            }
        }
        return {}
    }
</script>

<script>
import { goto } from "$app/navigation";

    import { authClient } from "$lib/axios";
    import { onMount } from "svelte";

    async function login() {    
        const formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        const loginResponse = await authClient.post('/api/login', formData).catch(e => console.log('LOGIN ERROR', e))
        console.log(loginResponse);
        goto('/dashboard')
    }

    function onSubmit(e) {
        e.preventDefault()
        login()
    }

    onMount(async () => {
       
    })

    let email = "admin@lindgr3n.com";
    let password = "password";
</script>
    
    <form on:submit={onSubmit} >
        <input type="text" name="email" bind:value={email} >
        <input type="password" name="email" bind:value={password} >
        <button type="submit">Login</button>
    </form>