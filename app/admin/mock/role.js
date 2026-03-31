export const roles = [
    {
        id: 1,
        name: "Admin",
        permissions: [
            "create_user",
            "edit_user",
            "delete_user",
            "view_user",
            "create_product",
            "edit_product",
            "delete_product",
            "view_product",
            "view_orders",
            "edit_orders"
        ]
    },
    {
        id: 2,
        name: "Manager",
        permissions: [
            "view_user",
            "edit_user",
            "view_product",
            "edit_product",
            "view_orders"
        ]
    },
    {
        id: 3,
        name: "Staff",
        permissions: [
            "view_product",
            "view_orders"
        ]
    }
];

export const permissions = [
    "create_user",
    "edit_user",
    "delete_user",
    "view_user",
    "create_product",
    "edit_product",
    "delete_product",
    "view_product",
    "view_orders",
    "edit_orders"
];