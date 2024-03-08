import { apiSlice } from "../../services/apiSlice";

interface User {
    name: string,
    id: number,
    email: string
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        me: builder.query<User, void>({
            query: () => "/auth/users/me/"
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/auth/jwt/create/",
                method: "POST",
                body: { email, password },
            })
        }),
        signup: builder.mutation({
            query: ({ first_name, last_name ,email, password, re_password }) => ({
                url: "/auth/users/",
                method: "POST",
                body: { first_name,last_name, email, password, re_password },
            })
        }),
        activateAccount: builder.mutation({
            query: ({ uid, token }) => ({
                url: "/auth/users/activation/",
                method: "POST",
                body: { uid, token },
            })
        }),
        resendActivationEmail: builder.mutation({
            query: (email) => ({
                url: "/auth/users/resend_activation/",
                method: "POST",
                body: { email },
            })
        }),
        changeName: builder.mutation({
            query: (name) => ({
                url: "/auth/users/me/",
                method: "PATCH",
                body: { name },
            })
        }),
        deleteAccount: builder.mutation({
            query: (current_password) => ({
                url: "/auth/users/me/",
                method: "DELETE",
                body: { current_password },
            })
        }),
        sendEmailChangeLink: builder.mutation({
            query: (email) => ({
                url: "/auth/users/reset_email/",
                method: "POST",
                body: { email },
            })
        }),
        changeEmail: builder.mutation({
            query: ({ uid, token, new_email }) => ({
                url: "/auth/users/reset_email_confirm/",
                method: "POST",
                body: { uid, token, new_email },
            })
        }),
        sendPasswordChangeLink: builder.mutation({
            query: (email) => ({
                url: "/auth/users/reset_password/",
                method: "POST",
                body: { email },
            })
        }),
        changePassword: builder.mutation({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: "/auth/users/reset_password_confirm/",
                method: "POST",
                body: { uid, token, new_password, re_new_password },
            })
        }),
        verifyJWT: builder.mutation({
            query: (access) => ({
                url: "/auth/jwt/verify/",
                method: "POST",
                body: { access },
            })
        }),
    })
})

export const {
    useMeQuery,
    useLoginMutation,
    useSignupMutation,
    useActivateAccountMutation,
    useResendActivationEmailMutation,
    useChangeNameMutation,
    useDeleteAccountMutation,
    useSendEmailChangeLinkMutation,
    useChangeEmailMutation,
    useSendPasswordChangeLinkMutation,
    useChangePasswordMutation,
    useVerifyJWTMutation,
} = authApiSlice