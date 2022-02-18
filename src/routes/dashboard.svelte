<script context="module">
    export async function load({session}) {
        const {authenticated} = session;
        
        return {
            props: {
                user: session.user
            }
        }
    }
</script>


<script>
    export let user;
</script>

DASHBOARD IS PRIVATE FOR USER {JSON.stringify(user)}