"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown";
import { FilterIcon } from "lucide-react";
import Link from "next/link";

export default function FilterByCategory({ categories }: { categories: { data: string[] } }) {
    console.log(categories);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full sm:w-[281px] flex items-center justify-center gap-x-3 rounded-lg bg-primary-500 py-2 text-primary-50">
                <div className="flex items-center gap-x-2">
                    Filter by Category
                    <FilterIcon />

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-primary-500 rounded-lg shadow-lg w-[281px] md:w-[200px]">
                <DropdownMenuItem>
                    <Link className="hover:text-primary-500  " href="/blog/category/technology">Technology</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="hover:text-primary-500" href="/blog/category/business">Business</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="hover:text-primary-500" href="/blog/category/lifestyle">Lifestyle</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="hover:text-primary-500" href="/blog/category/health">Health</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
