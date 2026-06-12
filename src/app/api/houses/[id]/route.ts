import {
    NextRequest,
    NextResponse
} from "next/server";

import { cookies } from "next/headers";


// PUT======== #$%^**&T^R%E$@#Q$W%E^&*&(T^*R%)

export async function PUT(
    request: NextRequest,
    context: {
        params: Promise<{id: string;}>;
    }
) {

    try {

        const { id } =  await context.params;
        const body = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        // console

        // console.log("TOKEN =>", token);
        // console.log("ID =>", id);
        // console.log("BODY =>", body);


        const response =
            await fetch(`http://188.121.111.8:3003/api/houses/${id}`,{
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify(
                        body
                    ),
                }
            );

        const data =
            await response.json();

        return NextResponse.json(
            data,
            {
                status:
                    response.status,
            }
        );

    } catch (err) {

        console.log("PUT ERROR =>", err);

        return NextResponse.json(
            {
                message:
                    "server error",
            },
            {
                status: 500,
            }
        );

    }

}


// DELETE ======== #$%^**&T^R%E$@#Q$W%E^&*&(T^*R%)

export async function DELETE(
    request: NextRequest,
    context: {
        params: Promise<{
            id: string;
        }>;
    }
) {

    try {

        const { id } =
            await context.params;

        const cookieStore =
            await cookies();

        const token =
            cookieStore.get(
                "accessToken"
            )?.value;

        const response =
            await fetch(
                `http://188.121.111.8:3003/api/houses/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        const data =
            await response.json();

        return NextResponse.json(
            data,
            {
                status:
                    response.status,
            }
        );

    } catch (error) {

        console.log(
            "DELETE ERROR =>",
            error
        );

        return NextResponse.json(
            {
                message:
                    "server error",
            },
            {
                status: 500,
            }
        );

    }

}