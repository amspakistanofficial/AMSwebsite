HOW TO ADD NEW PRODUCTS
=======================

STEP 1: Choose your category folder
   /public/products/cases/
   /public/products/cooling/
   /public/products/fans/
   /public/products/monitors/
   (or create a new folder for a new category)

STEP 2: Create a new folder for your product
   Example: /public/products/cases/my-new-case/

STEP 3: Add your files to the product folder
   - Add ONE image file (PNG, JPG, or WEBP)
   - Add ONE info.txt file

   Example structure:
   /public/products/cases/my-new-case/
       image.png       <-- Your product image (transparent PNG recommended)
       info.txt        <-- Product name and description

STEP 4: Format your info.txt file like this:
   Line 1: Product Name
   Line 2+: Product description...

   Example info.txt:
   --------------------------------
   NZXT H9 Elite
   Premium mid-tower case with stunning
   tempered glass panels and excellent
   airflow. Perfect for high-end builds.
   --------------------------------

STEP 5: Run the sync command
   npm run sync-products

   OR it will auto-sync when you run:
   npm run dev

That's it! Your product will appear on the website.


ALTERNATIVE (SIMPLER) METHOD
============================
You can also just add images directly to category folders:

   /public/products/cases/
       my-product.png    <-- Image file
       my-product.txt    <-- Text file with same name

The text file format is the same:
   Line 1: Product Name
   Line 2+: Description
