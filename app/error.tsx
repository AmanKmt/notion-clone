"use client"

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/error.png" height={300} width={300} alt="Error" className="dark:hidden" />
            <Image src="/error-dark.png" height={300} width={300} alt="Error" className="dark:block hidden" />

            <h2 className="text-lg font-medium">
                Oops, looks like something went wrong!
            </h2>

            <Button asChild>
                <Link href="/documents">
                    Go back
                </Link>
            </Button>
        </div>
    );
};
 
export default Error;