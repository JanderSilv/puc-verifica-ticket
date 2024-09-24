'use server'

import {
  revalidateTag as nextRevalidateTag,
  revalidatePath as nextRevalidatePath,
} from 'next/cache'

type RevalidatePathParams = Parameters<typeof nextRevalidatePath>

export async function revalidatePath(...params: RevalidatePathParams) {
  nextRevalidatePath(...params)
}

type RevalidateTagParams = Parameters<typeof nextRevalidateTag>

export async function revalidateTag(...params: RevalidateTagParams) {
  nextRevalidateTag(...params)
}
