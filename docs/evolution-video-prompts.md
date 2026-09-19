# Generating the evolution clip

## Why this is a handover and not a finished job

The clip could not be generated from the Claude Code session that wrote this.
The Hugging Face connector available there runs with `gradio=none`, which
disables Space invocation, and no other video-generation tool was connected. So
the site was wired to accept a clip rather than left waiting for one.

**The code is already done.** `components/sections/evolution.tsx` now lists two
video sources in preference order:

```
/evolution.mp4   <- drop your generated clip here, it wins automatically
/evolution.webm  <- the existing hand-animated fallback, stays put
```

Save the finished file as `public/evolution.mp4` and it takes over. Nothing else
to change. If you hate it, delete the file and the old clip comes straight back.

Shipping both is worth doing anyway: iOS Safari will not decode the VP8 webm at
all, so an H.264 MP4 alongside it fixes an existing silent gap on iPhones.

## Which tool

Checked September 2026.

| Tool | Free tier | Watermark | Verdict |
|---|---|---|---|
| **Hailuo (MiniMax)** | Daily refreshing credits, no cap | **None** | **Use this one** |
| Luma Dream Machine | Daily generations, 720p | Yes | Use only for the keyframe trick below |
| Kling | 66 credits/day, the most generous | Yes | Good quality, watermark rules it out |
| Google Veo 3 | Effectively paid, about $20/month | None | Not worth it for one clip |

A watermark in the middle of a portfolio page reads as "made with a free trial",
which undercuts the exact impression the section exists to create. That single
consideration outranks small quality differences, so Hailuo is the pick.

## Specification

- Aspect ratio **16:9**. The container is full width, and the poster image it
  falls back to is 1440x607.
- **4 to 6 seconds.** It loops silently and forever. Anything longer stops
  reading as a motif and starts demanding attention the page needs elsewhere.
- No audio. The element is `muted` and `loop`.
- Export **H.264 MP4**. Keep it under about 2MB if you can; the current webm is
  1.06MB and this is above the fold on a page recruiters open on phones.

## The palette, so it matches the site

Give these to the image generator, not just the video tool.

```
paper      #FBF9F5    cream   #F1E7D8
brown      #5B4130    brown-deep #3A2A1D
rust       #A9673F    taupe   #B79772
```

Warm, printed, editorial. Not neon, not sci-fi blue, not glossy 3D render.

## Route A: Hailuo, image to video, one shot

Generate a starting frame first, then animate it.

**Starting frame prompt** (for Qwen-Image, FLUX, Midjourney, or Gemini's image
generation):

> Minimal editorial illustration, wide 16:9 composition. Warm cream paper
> background with subtle grain. On the left third, an infant crawling in side
> profile, a clean flat silhouette in deep warm brown with a soft rust-orange
> rim light. One thin horizontal ground line across the frame in muted brown.
> Large empty negative space to the right. Flat vector poster art, muted earth
> tones only, no text, no letters, no words, restrained graphic design.

**Animation prompt** (Hailuo, image to video):

> The silhouette moves left to right along the ground line and transforms as it
> travels. It rises from crawling to walking as a toddler, then becomes a
> youth traced with fine circuitry lines in rust orange, then becomes a lean
> machine that sprints and accelerates out of frame to the right. Horizontal
> speed streaks build behind it as it gets faster. The camera does not move.
> The background stays a flat cream paper texture throughout. Smooth continuous
> transformation, no cuts, no text.

**Negative prompt:**

> text, letters, words, watermark, logo, photorealistic, 3D render, neon,
> glossy, camera pan, camera zoom, shaky, human face, detailed face

The single most important instruction there is **the camera does not move**. An
earlier version of this section tracked a camera across a static image and it
read as sliding rather than transforming, which is the whole point of the clip.

## Route B: Luma keyframes, if Route A loses the middle stages

One-shot generation sometimes skips straight from infant to machine. Luma lets
you pin a start and an end image, so you can force the stages.

Generate two frames, run the interpolation, then repeat for each pair:

1. crawling infant, far left
2. walking toddler, left of centre
3. youth traced with rust circuitry, right of centre
4. machine mid-sprint with speed streaks, exiting right

That is three clips to join, and joining them needs ffmpeg, which is not
installed on this machine. Route A is one file and no stitching, so try it
first and only fall back to this if the result genuinely loses the narrative.

## Before you ship it

- Watch it loop five times. The join from last frame to first is where a
  generated clip usually betrays itself with a jump.
- Check it on a phone. This sits near the top of the page.
- Confirm there is no text anywhere in frame. Generators like to hallucinate
  captions, and a misspelled word in a hero animation is worse than no
  animation.
- The poster image `public/evolution-poster.jpg` still shows the old four-panel
  artwork, and it is also the Open Graph preview image for the whole site. If
  the new clip looks materially different, export a frame from it and replace
  the poster too, or the link preview and the video will disagree.
